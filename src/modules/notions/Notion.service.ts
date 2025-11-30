import type { INotion, INotions } from "./Notion.model.ts";
import type { NotionRepository } from "./Notion.repository.ts";

export class NotionService {
  private repository: NotionRepository;

  constructor(repository: NotionRepository) {
    this.repository = repository;
  }

  async getAllNotions(): Promise<INotions> {
    return await this.repository.findAll();
  }

  async getNotionsById(id: string): Promise<INotion | null> {
    return (await this.repository.findById(id)) || null;
  }

  // createNotion(notionData: Omit<INotion, "id">): INotion {
  //   if (!notionData || !notionData.description) {
  //     throw new Error("Name and description are required");
  //   }

  //   return this.repository.create(notionData);
  // }

  // updateNotion(id: string, updates: Partial<Omit<INotion, "id">>): INotion {
  //   if (!updates.name && !updates.description) {
  //     throw new Error("At least one field must be provided for update");
  //   }

  //   const updatedNotion = this.repository.update(id, updates);

  //   if (!updatedNotion) {
  //     throw new Error("Notion not found");
  //   }

  //   return updatedNotion;
  // }

  // deleteNotion(id: string): void {
  //   const isDeleted = this.repository.delete(id);

  //   if (!isDeleted) {
  //     throw new Error("Notion not found");
  //   }
  // }
}
