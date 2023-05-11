-- CreateTable
CREATE TABLE `universities` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `state_province` VARCHAR(191) NULL,
    `alpha_two_code` CHAR(2) NOT NULL,
    `domains` VARCHAR(191) NOT NULL,
    `web_pages` LONGTEXT NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
