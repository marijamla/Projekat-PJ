import { configDotenv } from "dotenv";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { LoginModel } from "../models/login.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const repo = AppDataSource.getRepository(User)
configDotenv()
const accessSecret = process.env.JWT_ACCESS_SECRET
const accessTTL = parseInt(process.env.JWT_ACCESS_TTL || '3600')
const refreshSecret = process.env.JWT_REFRESH_SECRET
const refreshTTL = parseInt(process.env.JWT_REFRESH_TTL || '86400')

export class UserService {
    static async login(model: LoginModel) {
        const user = await this.getByEmail(model.email);
        console.log("Access secret:", accessSecret)
        console.log("Accees TTL", accessTTL)

        if (await bcrypt.compare(model.password, user.password)) {
            const payload = {
                email: user.email
            }
            return {
                email: user.email,
                access: jwt.sign(payload, accessSecret, { expiresIn: accessTTL }),
                refresh: jwt.sign(payload, refreshSecret, { expiresIn: refreshTTL })
            }
        }

        throw new Error("Pogresni kredencijali")
    }

    static async register(model: LoginModel) {
        const data = await repo.findOne({
            select: {
                userId: true
            },
            where: {
                email: model.email
            }
        })

        if (data != undefined)
            throw new Error('Korisnik već postoji!')

        const hashed = await bcrypt.hash(model.password, 12)
        await repo.save({
            email: model.email,
            password: hashed,
            createdAt: new Date()
        })
    }

    static async refresh(token: string) {
        const decoded: any = jwt.verify(token, refreshSecret)
        const email = decoded.email
        return {
            email: email,
            access: jwt.sign({ email: email }, accessSecret, { expiresIn: accessTTL }),
            refresh: token
        }
    }

    static async getByEmail(email: string) {
        const data = await repo.findOne({
            where: {
                email: email
            }
        })

        if (data == undefined)
            throw new Error("Korisnik nije pronađen")

        return data
    }

    static async verifyToken(req, res, next) {
        if (req.path == '/api/user/login' || req.path == '/api/user/refresh' || req.path == '/api/user/register') {
            next()
            return
        }

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == undefined) {
            res.status(401).json({
                message: 'Token nije pronadjen',
                timestamp: new Date()
            })
            return
        }

        jwt.verify(token, accessSecret, (err: any, user: any) => {
            if (err) {
                res.status(403).json({
                    message: 'Token nije pronadjen',
                    timestamp: new Date()
                })
                return
            }

            req.user = user
            next()
        })
    }
}