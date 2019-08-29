export const config = {
    shouldUseSentry: false, // sentry - app crash report system
    wallet: {
        isProd: false, // use prod net or testnet
        salt: '45v67n6756tv',
    },
    electrumConfigJsonURL: 'https://digitalbank.fund:8080/servers.json',
    electrumProxyAPIUrl: 'https://digitalbank.fund:8080/api/',
};
