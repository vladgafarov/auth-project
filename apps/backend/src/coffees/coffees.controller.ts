import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { Roles } from '../iam/authorization/decorators/roles.decorator'
import { Auth } from '../iam/decorators/auth.decorator'
import { AuthType } from '../iam/enums/auth-type.enum'
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface'
import { Role } from '../users/enums/role.enum'
import { CoffeesService } from './coffees.service'
import { CreateCoffeeDto } from './dto/create-coffee.dto'
import { UpdateCoffeeDto } from './dto/update-coffee.dto'
import { ActiveUser } from '../iam/decorators/active-user.decorator'

//@Roles(Role.Admin)
@Auth(AuthType.None)
@Controller('coffees')
export class CoffeesController {
	constructor(private readonly coffeesService: CoffeesService) {}

	@Post()
	create(@Body() createCoffeeDto: CreateCoffeeDto) {
		return this.coffeesService.create(createCoffeeDto)
	}

	@Get()
	findAll(@ActiveUser() user: ActiveUserData) {
		console.log(user)
		return this.coffeesService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.coffeesService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
		return this.coffeesService.update(+id, updateCoffeeDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.coffeesService.remove(+id)
	}
}
