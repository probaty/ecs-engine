export abstract class Addon<GS>{
  public abstract name: string
  public abstract onCreate(gameState: GS): void
  public abstract onDestroy(gameState: GS): void
}
