import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CatsModule,  MongooseModule.forRoot(
      'mongodb+srv://Den:Coq0utRzPcAuRG6Y@test-task-manager-clust.pohp3.mongodb.net/Cats?retryWrites=true&w=majority',
  ), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
