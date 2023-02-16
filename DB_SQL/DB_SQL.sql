DROP TABLE IF EXISTS "conversations" 
DROP TABLE IF EXISTS "users_to_conversations" 
DROP TABLE IF EXISTS "messages" 
DROP TABLE IF EXISTS "catalogs"
DROP TABLE IF EXISTS "catalogs_to_conversations"

CREATE TABLE "conversations"(
  "id" SERIAL PRIMARY KEY,
  "createdAt" TIMESTAMP DEFAULT current_timestamp,
  "updatedAt" TIMESTAMP DEFAULT current_timestamp
) 
CREATE TABLE "users_to_conversations"(
  "conversationId" INT REFERENCES "conversations"("id"),
  "userId" INT REFERENCES "users"("id"),
  "blackList" BOOLEAN NOT NULL,
  "favoriteList" BOOLEAN NOT NULL,
  PRIMARY KEY ("conversationId","userId")
)
CREATE TABLE "messages"(
  "id" SERIAL PRIMARY KEY,
  "body" VARCHAR(512) NOT NULL CHECK("body"!=''),
  "sender" INT,
  "conversationId" INT,
  FOREIGN KEY ("conversationId","sender") REFERENCES "users_to_conversations"("conversationId","userId"),
  "createdAt" TIMESTAMP DEFAULT current_timestamp,
  "updatedAt" TIMESTAMP DEFAULT current_timestamp
)
CREATE TABLE "catalogs"(
  "id" SERIAL PRIMARY KEY,
  "userId" INT REFERENCES "users"("id"),
  "catalogName" VARCHAR(32) NOT NULL CHECK("catalogName"!='')
)
CREATE TABLE "catalogs_to_conversations"(
  "conversationId" INT REFERENCES "conversations"("id"),
  "catalogId" INT REFERENCES "catalogs"("id"),
  PRIMARY KEY ("conversationId","catalogId")
)


