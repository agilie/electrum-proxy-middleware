const router = require('express-async-router').AsyncRouter();

// server.features
router.get('/features', async function (req, res) {
    if (req.query['protocol_version']) {
        const clientName = req.query['client_name'] || 'test';
        const protocolVersion = req.query['protocol_version'];
        await req.locals.ecl.server_version(clientName, protocolVersion);
    }

    const json = await req.locals.ecl.server_features();
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

// server.banner
router.get('/banner', async function (req, res) {
    const data = await req.locals.ecl.server_banner();
    await req.locals.ecl.close();

    res.send(data);
});

// server.version
router.post('/version', async function (req, res) {
    const clientName = req.params['client_name'];
    const protocolVersion = req.params['protocol_version'];
    const json = await req.locals.ecl.server_version(clientName, protocolVersion);
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

// server.version
router.get('/version', async function (req, res) {
    if (req.query['protocol_version']) {
        const clientName = req.query['client_name'] || 'test';
        const protocolVersion = req.query['protocol_version'];
        await req.locals.ecl.server_version(clientName, protocolVersion);
    }
    const json = await req.locals.ecl.server_version();
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

// server.donation_address
router.get('/donation-address', async function (req, res) {
    const json = await req.locals.ecl.serverDonation_address();
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

// server.add_peer
router.get('/add_peer', async function (req, res) {
    const json = await req.locals.ecl.server_addPeer();
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

// server.peers.subscribe
router.get('/get-peers', async function (req, res) {
    const json = await req.locals.ecl.serverPeers_subscribe();
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

// server.ping
router.get('/ping', async function (req, res) {
    const json = await req.locals.ecl.server_ping();
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});
module.exports = router;
