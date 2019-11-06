import {Netmode} from '../../../src/electrum-client/types/netmode';

const electrumClient = require('../../../src/electrum-client/define-electrum-client');
import {ProtocolTypeEnum} from '../../../src/electrum-client/types/protocol.type.enum';
import {ConfigurationReqDTO} from '../../../src/electrum-client/types/configuration-req-dto';

describe('getOptions method', function() {
    describe('with configurations params', function() {

        describe('with valid configuration params', function() {
            it('return valid ElectrumConfig data', async function() {
                const query = {
                    port: 55002,
                    host: 'tn.not.fyi',
                    connectionType: ProtocolTypeEnum.SSL,
                    version: 1.4
                };
                const options = await electrumClient.getOptions(query);

                const expected: ConfigurationReqDTO = {
                    port: 55002,
                    host: 'tn.not.fyi',
                    connectionType: ProtocolTypeEnum.SSL,
                    version: 1.4
                };

                expect(options).toEqual(expected);
            });
        });

        describe('with invalid configuration params', function() {
            describe('with invalid port', function() {
                describe('without port', function() {
                    it('return warning about port', async function() {
                        const query = {
                            host: 'tn.not.fyi',
                            connectionType: ProtocolTypeEnum.SSL,
                            version: 1.4
                        };
                        try {
                            await electrumClient.getOptions(query);
                        } catch (error) {
                            const warning = error[0].constraints;
                            const expected: any = {
                                isDefined: 'port should not be null or undefined',
                                isNotEmpty: 'port should not be empty'
                            };
                            expect(warning).toEqual(expected);
                        }
                    });
                });

                describe('with empty port', function() {
                    it('return warning about port', async function() {
                        const query = {
                            port: '',
                            host: 'tn.not.fyi',
                            connectionType: ProtocolTypeEnum.SSL,
                            version: 1.4
                        };
                        try {
                            await electrumClient.getOptions(query);
                        } catch (error) {
                            const warning = error[0].constraints;
                            const expected: any = {isNotEmpty: 'port should not be empty'};
                            expect(warning).toEqual(expected);
                        }
                    });
                });
            });

            describe('with invalid version', function() {
                describe('without version', function() {
                    it('return warning about version', async function() {
                        const query = {
                            port: 55002,
                            host: 'tn.not.fyi',
                            connectionType: ProtocolTypeEnum.SSL
                        };
                        try {
                            await electrumClient.getOptions(query);
                        } catch (error) {
                            const warning = error[0].constraints;
                            const expected: any = {
                                isDefined: 'version should not be null or undefined',
                                isNotEmpty: 'version should not be empty'
                            };
                            expect(warning).toEqual(expected);
                        }
                    });
                });

                describe('with empty version', function() {
                    it('return warning about version', async function() {
                        const query = {
                            port: 55002,
                            host: 'tn.not.fyi',
                            connectionType: ProtocolTypeEnum.SSL,
                            version: ''
                        };
                        try {
                            await electrumClient.getOptions(query);
                        } catch (error) {
                            const warning = error[0].constraints;
                            const expected: any = {isNotEmpty: 'version should not be empty'};
                            expect(warning).toEqual(expected);
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
                        const expected: any = {isEnum: 'connectionType must be a valid enum value'};
                        expect(warning).toEqual(expected);
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
                            const expected: any = {
                                isDefined: 'host should not be null or undefined',
                                maxLength: 'host must be shorter than or equal to 20 characters',
                                minLength: 'host must be longer than or equal to 0 characters',
                                isString: 'host must be a string',
                                isNotEmpty: 'host should not be empty'
                            };
                            expect(warning).toEqual(expected);
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
                            const expected: any = {isNotEmpty: 'host should not be empty'};
                            expect(warning).toEqual(expected);
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
                            const expected: any = {maxLength: 'host must be shorter than or equal to 20 characters'};
                            expect(warning).toEqual(expected);
                        }
                    });
                });
            });
        });
    });
});
