import type { CreateNotionDto, INotion, INotions } from "./Notion.model.ts";
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

  async createNotion(notionData: CreateNotionDto): Promise<INotion> {
    if (!notionData.name || !notionData.description) {
      throw new Error("Name and description are required");
    }

    return this.repository.create(notionData);
  }

  async updateNotion(
    id: string,
    updates: Partial<CreateNotionDto>
  ): Promise<INotion> {
    if (!updates.name && !updates.description) {
      throw new Error("At least one field must be provided for update");
    }

    const updatedNotion = await this.repository.update(id, updates);

    if (!updatedNotion) {
      throw new Error("Notion not found");
    }

    return updatedNotion;
  }

  async deleteNotion(id: string): Promise<void> {
    const isDeleted = await this.repository.delete(id);

    if (!isDeleted) {
      throw new Error("Notion not found");
    }
  }
}
