"use strict";
import { isHexString } from "@ethersproject/bytes";
import { Description, defineReadOnly } from "@ethersproject/properties";
import { Logger } from "@ethersproject/logger";
import { version } from "./_version";
const logger = new Logger(version);
;
;
//export type CallTransactionable = {
//    call(transaction: TransactionRequest): Promise<TransactionResponse>;
//};
export class ForkEvent extends Description {
    static isForkEvent(value) {
        return !!(value && value._isForkEvent);
    }
}
export class BlockForkEvent extends ForkEvent {
    constructor(blockhash, expiry) {
        if (!isHexString(blockhash, 32)) {
            logger.throwArgumentError("invalid blockhash", "blockhash", blockhash);
        }
        super({
            _isForkEvent: true,
            _isBlockForkEvent: true,
            expiry: (expiry || 0),
            blockHash: blockhash
        });
    }
}
export class TransactionForkEvent extends ForkEvent {
    constructor(hash, expiry) {
        if (!isHexString(hash, 32)) {
            logger.throwArgumentError("invalid transaction hash", "hash", hash);
        }
        super({
            _isForkEvent: true,
            _isTransactionForkEvent: true,
            expiry: (expiry || 0),
            hash: hash
        });
    }
}
export class TransactionOrderForkEvent extends ForkEvent {
    constructor(beforeHash, afterHash, expiry) {
        if (!isHexString(beforeHash, 32)) {
            logger.throwArgumentError("invalid transaction hash", "beforeHash", beforeHash);
        }
        if (!isHexString(afterHash, 32)) {
            logger.throwArgumentError("invalid transaction hash", "afterHash", afterHash);
        }
        super({
            _isForkEvent: true,
            _isTransactionOrderForkEvent: true,
            expiry: (expiry || 0),
            beforeHash: beforeHash,
            afterHash: afterHash
        });
    }
}
///////////////////////////////
// Exported Abstracts
export class Provider {
    // Alias for "on"
    addListener(eventName, listener) {
        return this.on(eventName, listener);
    }
    // Alias for "off"
    removeListener(eventName, listener) {
        return this.off(eventName, listener);
    }
    constructor() {
        logger.checkAbstract(new.target, Provider);
        defineReadOnly(this, "_isProvider", true);
    }
    static isProvider(value) {
        return !!(value && value._isProvider);
    }
}