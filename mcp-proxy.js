#!/usr/bin/env node

const https = require('https');

const MCP_SERVER_URL = 'https://spectrum2-mcp-server.philipp-koch.workers.dev';

// MCP proxy that converts stdio to HTTP for Cloudflare Worker MCP server
process.stdin.setEncoding('utf8');

let buffer = '';

process.stdin.on('data', (chunk) => {
    buffer += chunk;

    // Try to parse complete JSON messages
    let lines = buffer.split('\n');
    buffer = lines.pop(); // Keep incomplete line in buffer

    for (let line of lines) {
        if (line.trim()) {
            try {
                const message = JSON.parse(line);
                forwardToServer(message);
            } catch (e) {
                sendError('Parse error: ' + e.message);
            }
        }
    }
});

function forwardToServer(message) {
    // Handle MCP initialization
    if (message.method === 'initialize') {
        sendResponse(message.id, {
            protocolVersion: "2024-11-05",
            capabilities: {
                tools: {}
            },
            serverInfo: {
                name: "spectrum2-mcp-server",
                version: "0.1.0"
            }
        });
        return;
    }

    const postData = JSON.stringify(message);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = https.request(MCP_SERVER_URL, options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
            responseData += chunk;
        });

        res.on('end', () => {
            try {
                if (res.statusCode === 200) {
                    const response = JSON.parse(responseData);
                    if (message.id) {
                        sendResponse(message.id, response);
                    } else {
                        console.log(JSON.stringify(response));
                    }
                } else {
                    sendError(`HTTP ${res.statusCode}: ${responseData}`);
                }
            } catch (e) {
                sendError('Response parse error: ' + e.message + ' - Raw response: ' + responseData);
            }
        });
    });

    req.on('error', (e) => {
        sendError('Request error: ' + e.message);
    });

    req.write(postData);
    req.end();
}

function sendResponse(id, result) {
    const response = {
        jsonrpc: "2.0",
        id: id,
        result: result
    };
    console.log(JSON.stringify(response));
}

function sendError(message) {
    const error = {
        jsonrpc: "2.0",
        error: {
            code: -32000,
            message: message
        }
    };
    console.log(JSON.stringify(error));
}

process.on('SIGINT', () => {
    process.exit(0);
});