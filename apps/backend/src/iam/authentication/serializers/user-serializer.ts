import { PassportSerializer } from '@nestjs/passport'
import { User } from '@prisma/client'
import { ActiveUserData } from '../../interfaces/active-user-data.interface'

export class UserSerializer extends PassportSerializer {
	serializeUser(user: User, done: (err: Error, user: ActiveUserData) => void) {
		done(null, {
			sub: user.id,
			email: user.email,
			roleId: user.roleId,
		})
	}

	deserializeUser(
		payload: ActiveUserData,
		done: (err: Error, user: ActiveUserData) => void,
	) {
		done(null, payload)
	}
}
