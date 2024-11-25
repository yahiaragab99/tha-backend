"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const typeorm_1 = require("typeorm");
const QrCode_entity_1 = require("./QrCode.entity");
const MessagePreset_entity_1 = require("./MessagePreset.entity");
let Message = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)("messages")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _qrCode_decorators;
    let _qrCode_initializers = [];
    let _qrCode_extraInitializers = [];
    let _recipientId_decorators;
    let _recipientId_initializers = [];
    let _recipientId_extraInitializers = [];
    let _preset_decorators;
    let _preset_initializers = [];
    let _preset_extraInitializers = [];
    let _message_decorators;
    let _message_initializers = [];
    let _message_extraInitializers = [];
    let _isPreset_decorators;
    let _isPreset_initializers = [];
    let _isPreset_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _deletedAt_decorators;
    let _deletedAt_initializers = [];
    let _deletedAt_extraInitializers = [];
    var Message = _classThis = class {
        constructor() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.qrCode = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _qrCode_initializers, void 0));
            this.recipientId = (__runInitializers(this, _qrCode_extraInitializers), __runInitializers(this, _recipientId_initializers, void 0));
            this.preset = (__runInitializers(this, _recipientId_extraInitializers), __runInitializers(this, _preset_initializers, void 0));
            this.message = (__runInitializers(this, _preset_extraInitializers), __runInitializers(this, _message_initializers, void 0));
            this.isPreset = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _isPreset_initializers, void 0));
            this.createdAt = (__runInitializers(this, _isPreset_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            __runInitializers(this, _deletedAt_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Message");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)("uuid")];
        _qrCode_decorators = [(0, typeorm_1.ManyToOne)(() => QrCode_entity_1.QrCode), (0, typeorm_1.JoinColumn)({ name: "qr_code_id" })];
        _recipientId_decorators = [(0, typeorm_1.Column)({ type: "uuid", name: "recipient_id" })];
        _preset_decorators = [(0, typeorm_1.ManyToOne)(() => MessagePreset_entity_1.MessagePreset), (0, typeorm_1.JoinColumn)({ name: "preset_id" })];
        _message_decorators = [(0, typeorm_1.Column)({ type: "text" })];
        _isPreset_decorators = [(0, typeorm_1.Column)({ type: "boolean", name: "is_preset", default: false })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ name: "created_at" })];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)({ name: "deleted_at" })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _qrCode_decorators, { kind: "field", name: "qrCode", static: false, private: false, access: { has: obj => "qrCode" in obj, get: obj => obj.qrCode, set: (obj, value) => { obj.qrCode = value; } }, metadata: _metadata }, _qrCode_initializers, _qrCode_extraInitializers);
        __esDecorate(null, null, _recipientId_decorators, { kind: "field", name: "recipientId", static: false, private: false, access: { has: obj => "recipientId" in obj, get: obj => obj.recipientId, set: (obj, value) => { obj.recipientId = value; } }, metadata: _metadata }, _recipientId_initializers, _recipientId_extraInitializers);
        __esDecorate(null, null, _preset_decorators, { kind: "field", name: "preset", static: false, private: false, access: { has: obj => "preset" in obj, get: obj => obj.preset, set: (obj, value) => { obj.preset = value; } }, metadata: _metadata }, _preset_initializers, _preset_extraInitializers);
        __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: obj => "message" in obj, get: obj => obj.message, set: (obj, value) => { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
        __esDecorate(null, null, _isPreset_decorators, { kind: "field", name: "isPreset", static: false, private: false, access: { has: obj => "isPreset" in obj, get: obj => obj.isPreset, set: (obj, value) => { obj.isPreset = value; } }, metadata: _metadata }, _isPreset_initializers, _isPreset_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: obj => "deletedAt" in obj, get: obj => obj.deletedAt, set: (obj, value) => { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Message = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Message = _classThis;
})();
exports.Message = Message;
