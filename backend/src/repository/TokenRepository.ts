import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { TokenTable } from "../drizzle/schema";

export async function insertToken(
  user_id: number,
  body: string,
  expiration: Date,
  tx?: any
) {
  try {
    const dbCon = tx || db;
    return await dbCon
      .insert(TokenTable)
      .values({
        user_id,
        body,
        expiration: expiration,
      })
      .onConflictDoUpdate({
        target: TokenTable.user_id,
        set: {
          body,
          expiration: expiration,
        },
      })
      .returning({ id: TokenTable.user_id })
      .execute();
  } catch (error) {
    throw Error("Failed to insert token");
  }
}

export async function deleteToken(user_id: number, tx?: any) {
  try {
    const dbCon = tx || db;
    return await dbCon
      .delete(TokenTable)
      .where(eq(TokenTable.user_id, user_id))
      .execute();
  } catch (error) {
    throw Error("Failed to delete token");
  }
}
