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
exports.QrCode = void 0;
const typeorm_1 = require("typeorm");
const QrCodeType_entity_1 = require("./QrCodeType.entity");
const ItemCategory_entity_1 = require("./ItemCategory.entity");
let QrCode = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)("qr_codes")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _qrCodeType_decorators;
    let _qrCodeType_initializers = [];
    let _qrCodeType_extraInitializers = [];
    let _code_decorators;
    let _code_initializers = [];
    let _code_extraInitializers = [];
    let _itemName_decorators;
    let _itemName_initializers = [];
    let _itemName_extraInitializers = [];
    let _itemDetails_decorators;
    let _itemDetails_initializers = [];
    let _itemDetails_extraInitializers = [];
    let _itemCategory_decorators;
    let _itemCategory_initializers = [];
    let _itemCategory_extraInitializers = [];
    let _isClaimed_decorators;
    let _isClaimed_initializers = [];
    let _isClaimed_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    let _deletedAt_decorators;
    let _deletedAt_initializers = [];
    let _deletedAt_extraInitializers = [];
    var QrCode = _classThis = class {
        constructor() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.userId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.qrCodeType = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _qrCodeType_initializers, void 0));
            this.code = (__runInitializers(this, _qrCodeType_extraInitializers), __runInitializers(this, _code_initializers, void 0));
            this.itemName = (__runInitializers(this, _code_extraInitializers), __runInitializers(this, _itemName_initializers, void 0));
            this.itemDetails = (__runInitializers(this, _itemName_extraInitializers), __runInitializers(this, _itemDetails_initializers, void 0));
            this.itemCategory = (__runInitializers(this, _itemDetails_extraInitializers), __runInitializers(this, _itemCategory_initializers, void 0));
            this.isClaimed = (__runInitializers(this, _itemCategory_extraInitializers), __runInitializers(this, _isClaimed_initializers, void 0));
            this.createdAt = (__runInitializers(this, _isClaimed_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            __runInitializers(this, _deletedAt_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "QrCode");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)("uuid")];
        _userId_decorators = [(0, typeorm_1.Column)({ type: "uuid", name: "user_id" })];
        _qrCodeType_decorators = [(0, typeorm_1.ManyToOne)(() => QrCodeType_entity_1.QrCodeType), (0, typeorm_1.JoinColumn)({ name: "qr_code_type_id" })];
        _code_decorators = [(0, typeorm_1.Column)({ type: "varchar", length: 255, unique: true })];
        _itemName_decorators = [(0, typeorm_1.Column)({ type: "varchar", length: 255, name: "item_name", nullable: true })];
        _itemDetails_decorators = [(0, typeorm_1.Column)({ type: "text", name: "item_details", nullable: true })];
        _itemCategory_decorators = [(0, typeorm_1.ManyToOne)(() => ItemCategory_entity_1.ItemCategory), (0, typeorm_1.JoinColumn)({ name: "item_category" })];
        _isClaimed_decorators = [(0, typeorm_1.Column)({ type: "boolean", name: "is_claimed", default: false })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ name: "created_at" })];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)({ name: "updated_at" })];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)({ name: "deleted_at" })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _qrCodeType_decorators, { kind: "field", name: "qrCodeType", static: false, private: false, access: { has: obj => "qrCodeType" in obj, get: obj => obj.qrCodeType, set: (obj, value) => { obj.qrCodeType = value; } }, metadata: _metadata }, _qrCodeType_initializers, _qrCodeType_extraInitializers);
        __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: obj => "code" in obj, get: obj => obj.code, set: (obj, value) => { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
        __esDecorate(null, null, _itemName_decorators, { kind: "field", name: "itemName", static: false, private: false, access: { has: obj => "itemName" in obj, get: obj => obj.itemName, set: (obj, value) => { obj.itemName = value; } }, metadata: _metadata }, _itemName_initializers, _itemName_extraInitializers);
        __esDecorate(null, null, _itemDetails_decorators, { kind: "field", name: "itemDetails", static: false, private: false, access: { has: obj => "itemDetails" in obj, get: obj => obj.itemDetails, set: (obj, value) => { obj.itemDetails = value; } }, metadata: _metadata }, _itemDetails_initializers, _itemDetails_extraInitializers);
        __esDecorate(null, null, _itemCategory_decorators, { kind: "field", name: "itemCategory", static: false, private: false, access: { has: obj => "itemCategory" in obj, get: obj => obj.itemCategory, set: (obj, value) => { obj.itemCategory = value; } }, metadata: _metadata }, _itemCategory_initializers, _itemCategory_extraInitializers);
        __esDecorate(null, null, _isClaimed_decorators, { kind: "field", name: "isClaimed", static: false, private: false, access: { has: obj => "isClaimed" in obj, get: obj => obj.isClaimed, set: (obj, value) => { obj.isClaimed = value; } }, metadata: _metadata }, _isClaimed_initializers, _isClaimed_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: obj => "deletedAt" in obj, get: obj => obj.deletedAt, set: (obj, value) => { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        QrCode = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return QrCode = _classThis;
})();
exports.QrCode = QrCode;
