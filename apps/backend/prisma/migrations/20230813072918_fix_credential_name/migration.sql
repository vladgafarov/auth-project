/*
  Warnings:

  - You are about to drop the column `cridentialID` on the `WebauthnDevice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[credentialID]` on the table `WebauthnDevice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `credentialID` to the `WebauthnDevice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WebauthnDevice" DROP COLUMN "cridentialID",
ADD COLUMN     "credentialID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WebauthnDevice_credentialID_key" ON "WebauthnDevice"("credentialID");
