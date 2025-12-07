import { Injectable } from '@nestjs/common';
import { UserInterface } from '@/interfaces/user.interface';

@Injectable()
export class UsersService {
  private baseUrl = 'http://localhost:7000/api/v1/user';

  async findAll(): Promise<UserInterface[]> {
    const res = await fetch(this.baseUrl);
    return res.json();
  }

  async findById(id: number): Promise<UserInterface> {
    const res = await fetch(`${this.baseUrl}/${id}`);
    return res.json();
  }

  async updateUser(
    id: number,
    data: Partial<UserInterface>,
  ): Promise<UserInterface> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }
}
