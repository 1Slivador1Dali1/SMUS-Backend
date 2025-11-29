import type { INotion, INotions } from "./Notion.model.ts";

export class NotionRepository {
  private notions: INotions;

  constructor(notions: INotions) {
    this.notions = notions;
  }

  findAll(): INotions {
    return this.notions;
  }

  findById(id: string): INotion | undefined {
    return this.notions.items.find((n) => n.id === id);
  }

  create(notion: Omit<INotion, "id">): INotion {
    const newNotion: INotion = {
      id: String(this.notions.items.length + 1),
      ...notion,
    };

    this.notions.items.push(newNotion);

    return newNotion;
  }

  update(id: string, updates: Partial<Omit<INotion, "id">>): INotion | null {
    const notion = this.findById(id);

    if (!notion) return null;

    if (updates.name) notion.name = updates.name;
    if (updates.description) notion.description = updates.description;

    return notion;
  }

  delete(id: string): boolean {
    const index = this.notions.items.findIndex((n) => n.id === id);

    if (index === -1) return false;

    this.notions.items.splice(index, 1);
    return true;
  }
}
