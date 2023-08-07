import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ActiveUser } from '../iam/decorators/active-user.decorator'
import { Auth } from '../iam/decorators/auth.decorator'
import { AuthType } from '../iam/enums/auth-type.enum'
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface'
import { CoffeesService } from './coffees.service'
import { CreateCoffeeDto } from './dto/create-coffee.dto'
import { UpdateCoffeeDto } from './dto/update-coffee.dto'

//@Roles(Role.Admin)
@Auth(AuthType.None)
@ApiTags('coffees')
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
