import jwt from 'jsonwebtoken';
import { ENV } from '../env';
import {IUser} from '../types/user.types';
import { prisma } from '..';

class TokenService {
    generateTokens(User: IUser) {
        const accessToken = jwt.sign(User, ENV.JWT_SECRET_KEY, {expiresIn: '15m'});
        const refreshToken = jwt.sign(User, ENV.JWT_SECRET_KEY, {expiresIn: '60d'});
        return {accessToken, refreshToken}
    }
    
    validateAccessToken(accessToken: string) {
        const data = jwt.verify(accessToken, ENV.JWT_SECRET_KEY);
        return data;
    }
    
    validateRefreshToken(refreshToken: string) {
        const data = jwt.verify(refreshToken, ENV.JWT_SECRET_KEY);
        return data;
    }

    async findRefreshToken(refreshToken: string) {
        const tokenData = await prisma.token.findUnique({
            where: {refreshToken: refreshToken}
        })
        return tokenData;
    }
    
    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await prisma.token.findFirst({
            where: {userId: userId}
        })
        if (tokenData) {
            const updatedToken = await prisma.token.update({
                where: {id: tokenData.id},
                data: {
                    refreshToken: refreshToken
                }
            })
            return updatedToken;
        }
        const token = await prisma.token.create({
            data: {
                userId: userId,
                refreshToken: refreshToken
            }
        })
        return token;
    }

    async removeToken(refreshToken: string) {
        const token = await prisma.token.delete({
            where: {refreshToken: refreshToken} 
        })
        return token;
    }
}

export default new TokenService();