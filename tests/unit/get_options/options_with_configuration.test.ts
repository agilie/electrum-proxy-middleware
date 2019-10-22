let electrumClient = require('../../../src/electrum-client/define-electrum-client');

import {ProtocolTypeEnum} from '../../../src/electrum-client/types/protocol.type.enum';

describe('getOptions method', function() {
    describe('with configurations params', function() {

        describe('with valid configuration params', function() {
            it('return valid ElectrumConfig data', async function() {
                const query = {
                    port: '55002',
                    host: 'tn.not.fyi',
                    connectionType: 'ssl',
                    version: '1.4'
                };
                const options = await electrumClient.getOptions(query);

                expect(options).toHaveProperty('host');
                expect(options).toHaveProperty('port');
                expect(options).toHaveProperty('connectionType');
                expect(options).toHaveProperty('version');

                expect(options.host).toEqual(expect.stringContaining('tn.not.fyi'));
                expect(options.port).toEqual(expect.stringContaining('55002'));
                expect(options.connectionType).toEqual(expect.stringContaining(ProtocolTypeEnum.SSL));
                expect(options.version).toEqual(expect.stringContaining('1.4'));
            });
        });

        describe('with invalid configuration params', function() {
            describe('with invalid port', function() {
                describe('without port', function() {
                    it('return warning about port', async function() {
                        const query = {
                            host: 'tn.not.fyi',
                            connectionType: 'ssl',
                            version: '1.4'
                        };
                        try {
                            await electrumClient.getOptions(query);
                        } catch (error) {
                            const warning = error[0].constraints;
                            expect(warning).toHaveProperty('isDefined');
                            expect(warning.isDefined).toEqual(expect.stringContaining('port should not be null or undefined'));
                            expect(warning).toHaveProperty('isNotEmpty');
                            expect(warning.isNotEmpty).toEqual(expect.stringContaining('port should not be empty'));
                        }
                    });
                });

                describe('with empty port', function() {
                    it('return warning about port', async function() {
                        const query = {
                            port: '',
                            host: 'tn.not.fyi',
                            connectionType: 'ssl',
                            version: '1.4'
                        };
                        try {
                            await electrumClient.getOptions(query);
                        } catch (error) {
                            const warning = error[0].constraints;
                            expect(warning).toHaveProperty('isNotEmpty');
                            expect(warning.isNotEmpty).toEqual(expect.stringContaining('port should not be empty'));
                        }
                    });
                });
            });

            describe('with invalid version', function() {
                describe('without version', function() {
                    it('return warning about version', async function() {
                        const query = {
                            port: '55002',
                            host: 'tn.not.fyi',
                            connectionType: 'ssl'
                        };
                        try {
                            await electrumClient.getOptions(query);
                        } catch (error) {
                            const warning = error[0].constraints;
                            expect(warning).toHaveProperty('isDefined');
                            expect(warning.isDefined).toEqual(expect.stringContaining('version should not be null or undefined'));
                            expect(warning).toHaveProperty('isNotEmpty');
                            expect(warning.isNotEmpty).toEqual(expect.stringContaining('version should not be empty'));
                        }
                    });
                });

                describe('with empty version', function() {
                    it('return warning about version', async function() {
                        const query = {
                            port: '55002',
                            host: 'tn.not.fyi',
                            connectionType: 'ssl',
                            version: ''
                        };
                        try {
                            await electrumClient.getOptions(query);
                        } catch (error) {
                            const warning = error[0].constraints;
                            expect(warning).toHaveProperty('isNotEmpty');
                            expect(warning.isNotEmpty).toEqual(expect.stringContaining('version should not be empty'));
                        }
                    });
                });
            });

            describe('with invalid connectionType', function() {
                it('return warning about connectionType', async function() {
                    const query = {
                        port: '55002',
                        host: 'tn.not.fyi',
                        connectionType: 'error',
                        version: '1.4'
                    };
                    try {
                        await electrumClient.getOptions(query);
                    } catch (error) {
                        const warning = error[0].constraints;
                        expect(warning).toHaveProperty('isEnum');
                        expect(warning.isEnum).toEqual(expect.stringContaining('connectionType must be a valid enum value'));
                    }
                });
            });

            describe('with invalid host', function() {
                describe('without host', function() {
                    it('return warning about host', async function() {
                        const query = {
                            port: '55002',
                            connectionType: 'ssl',
                            version: '1.4'
                        };
                        try {
                            await electrumClient.getOptions(query);
                        } catch (error) {
                            const warning = error[0].constraints;
                            expect(warning).toHaveProperty('isDefined');
                            expect(warning.isDefined).toEqual(expect.stringContaining('host should not be null or undefined'));
                            expect(warning).toHaveProperty('isNotEmpty');
                            expect(warning.isNotEmpty).toEqual(expect.stringContaining('host should not be empty'));
                        }
                    });
                });

                describe('with empty host', function() {
                    it('return warning about host', async function() {
                        const query = {
                            port: '55002',
                            host: '',
                            connectionType: 'ssl',
                            version: '1.4'
                        };
                        try {
                            await electrumClient.getOptions(query);
                        } catch (error) {
                            const warning = error[0].constraints;
                            expect(warning).toHaveProperty('isNotEmpty');
                            expect(warning.isNotEmpty).toEqual(expect.stringContaining('host should not be empty'));
                        }
                    });
                });

                describe('invalid empty host', function() {
                    it('return warning about host', async function() {
                        const query = {
                            port: '55002',
                            host: 'ttttt.ttttt.ttttt.ttttt.ttttt',
                            connectionType: 'ssl',
                            version: '1.4'
                        };
                        try {
                            await electrumClient.getOptions(query);
                        } catch (error) {
                            const warning = error[0].constraints;
                            expect(warning).toHaveProperty('maxLength');
                            expect(warning.maxLength).toEqual(expect.stringContaining('host must be shorter than or equal to 20 characters'));
                        }
                    });
                });
            });
        });
    });
});
