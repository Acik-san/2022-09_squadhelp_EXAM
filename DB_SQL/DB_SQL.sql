/* DB-SQL task:1 */
DROP TABLE IF EXISTS "conversations" 
DROP TABLE IF EXISTS "users_to_conversations" 
DROP TABLE IF EXISTS "messages" 
DROP TABLE IF EXISTS "catalogs"
DROP TABLE IF EXISTS "catalogs_to_conversations"

CREATE TABLE "conversations"(
  "id" SERIAL PRIMARY KEY,
  "createdAt" TIMESTAMP DEFAULT current_timestamp,
  "updatedAt" TIMESTAMP DEFAULT current_timestamp
);
CREATE TABLE "users_to_conversations"(
  "conversationId" INT REFERENCES "conversations"("id"),
  "userId" INT REFERENCES "users"("id"),
  "blackList" BOOLEAN NOT NULL,
  "favoriteList" BOOLEAN NOT NULL,
  PRIMARY KEY ("conversationId","userId")
);
CREATE TABLE "messages"(
  "id" SERIAL PRIMARY KEY,
  "body" VARCHAR(512) NOT NULL CHECK("body"!=''),
  "sender" INT,
  "conversationId" INT,
  FOREIGN KEY ("conversationId","sender") REFERENCES "users_to_conversations"("conversationId","userId"),
  "createdAt" TIMESTAMP DEFAULT current_timestamp,
  "updatedAt" TIMESTAMP DEFAULT current_timestamp
);
CREATE TABLE "catalogs"(
  "id" SERIAL PRIMARY KEY,
  "userId" INT REFERENCES "users"("id"),
  "catalogName" VARCHAR(32) NOT NULL CHECK("catalogName"!='')
);
CREATE TABLE "catalogs_to_conversations"(
  "conversationId" INT REFERENCES "conversations"("id"),
  "catalogId" INT REFERENCES "catalogs"("id"),
  PRIMARY KEY ("conversationId","catalogId")
);

/* DB-SQL task:2 */
SELECT "role", count(*)
FROM "users"
WHERE "role" IN ('creator','customer')
GROUP BY "role"

/* DB-SQL task:3 */
UPDATE "users"
SET "balance" = "balance" + ("contests"."total"*0.1)
FROM (
  SELECT "userId",SUM("prize") AS "total"
  FROM "contests"
  WHERE "createdAt"::date BETWEEN '2022-12-25'::date AND '2023-01-14'::date
  GROUP BY "userId" 
) AS "contests"
WHERE "users"."id"="contests"."userId"

/* DB-SQL task:4 */
UPDATE "users"
SET "balance" = "balance" + 10
WHERE "id" IN (
  SELECT "id"
  FROM "users"
  WHERE "role" = 'creator' 
  ORDER BY "rating" DESC
  LIMIT 3
)

