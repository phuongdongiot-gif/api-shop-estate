import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260503113028 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "service_booking" ("id" text not null, "customer_name" text not null, "customer_phone" text not null, "customer_email" text null, "service_type" text not null, "property_id" text null, "property_name" text null, "scheduled_date" timestamptz null, "scheduled_time" text null, "notes" text null, "address" text null, "budget" numeric null, "status" text not null default 'pending', "admin_notes" text null, "assigned_to" text null, "raw_budget" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "service_booking_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_service_booking_deleted_at" ON "service_booking" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "service_booking" cascade;`);
  }

}
