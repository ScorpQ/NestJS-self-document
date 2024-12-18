import { Controller, Get, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user-entity';

@Controller('users')
export class UsersController {
    
    // Dependecy Injection yapmak bu kadar kolay,
    // Sadece eklemek istediğin service/controller adını yazman yeterli
    // Normal yolla hiç DI yapmadığın için anlamak zor olur
    // İstersen GPT'ye şunu yaz: Bana basitçe Dependency Injection anlatır mısın çok basitçe başla...
    constructor(private userService: UsersService) {}

    // Bu şekilde basit bir endpoint yazabiliriz: localhost:3000/users

    // Ayrıca artık tipi 'any' yerine 'User' entity'si olarak belirlendi,
    // Böylece return edilen tipleri belirtebiliriz. Son olarak 
    // Sadece 'User' olarak belirtilmemiş [] dizi olduğu da belirtilmiş
    // çünkü bize toplu bir User entity datası dönmektedir.
    @Get()
    getUsers(): User[] {
        return this.userService.findAll();
    }


    // Bu şekilde parametre verebiliriz: localhost:3000/users/:id

    // Ayrıca verilen parametre eğer içeride 'number' olarak kullanılacaksa
    // build-in pipe'lardan birini kullanabiliriz. (ParseIntPipe)
    // Daha fazlası için: https://docs.nestjs.com/pipes

    // Ayrıca artık tipi 'any' yerine 'User' entity'si olarak belirlendi,
    // Böylece return edilen tipleri belirtebiliriz.
    @Get(':id')  
    getUsersById(@Param('id', ParseIntPipe) id: number): User {
        return this.userService.findById(id);
    }


    // Burada ise br post metodu var ve body'nin tipi
    // az önce oluşturduğumuz 'createUserDto' field'larını alabilir demektir.

    // Ayrıca artık tipi 'any' yerine 'User' entity'si olarak belirlendi,
    // Böylece return edilen tipleri belirtebiliriz.
    @Post()
    createUser(@Body() body: CreateUserDto): User {
        return this.userService.createUser(body);
    }
}

