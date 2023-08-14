/*
  Warnings:

  - You are about to alter the column `counter` on the `WebauthnDevice` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "WebauthnDevice" ALTER COLUMN "counter" SET DATA TYPE INTEGER;
