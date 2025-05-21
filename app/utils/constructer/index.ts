class StringBuilder {
  private buffer: string[];

  constructor() {
    this.buffer = [];
  }

  append(value: string): this {
    this.buffer.push(value);
    return this;
  }

  toString(): string {
    return this.buffer.join("");
  }
}

export { StringBuilder };
