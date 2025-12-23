"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetToken = void 0;
const common_1 = require("@nestjs/common");
exports.GetToken = (0, common_1.createParamDecorator)((_data, context) => {
    const request = context.switchToHttp().getRequest();
    if (!request.headers['authorization'])
        throw new common_1.UnauthorizedException();
    const [type, token] = request.headers['authorization'].split(' ') ?? [];
    if (type != 'Bearer' || !token)
        throw new common_1.UnauthorizedException();
    return token;
});
//# sourceMappingURL=get-token.param.js.map