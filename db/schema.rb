# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140708180141) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "clients", force: true do |t|
    t.string   "name",       null: false
    t.string   "company"
    t.integer  "user_id"
    t.string   "phone"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "clients", ["user_id"], name: "index_clients_on_user_id", using: :btree

  create_table "deliverables", force: true do |t|
    t.integer  "project_id",                            null: false
    t.string   "name",                                  null: false
    t.boolean  "completed",                             null: false
    t.integer  "hourly"
    t.integer  "parent_deliverable_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "rank",                                  null: false
    t.boolean  "collapsed",             default: false
    t.text     "description"
  end

  add_index "deliverables", ["parent_deliverable_id"], name: "index_deliverables_on_parent_deliverable_id", using: :btree
  add_index "deliverables", ["project_id"], name: "index_deliverables_on_project_id", using: :btree

  create_table "hours", force: true do |t|
    t.integer  "deliverable_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "invoice_id"
  end

  add_index "hours", ["deliverable_id"], name: "index_hours_on_deliverable_id", using: :btree

  create_table "invoices", force: true do |t|
    t.integer  "project_id", null: false
    t.datetime "date",       null: false
    t.boolean  "paid",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "number"
  end

  add_index "invoices", ["project_id"], name: "index_invoices_on_project_id", using: :btree

  create_table "projects", force: true do |t|
    t.integer  "user_id",                 null: false
    t.integer  "client_id",               null: false
    t.string   "name",                    null: false
    t.boolean  "open"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "hourly",      default: 0, null: false
  end

  add_index "projects", ["client_id"], name: "index_projects_on_client_id", using: :btree
  add_index "projects", ["user_id"], name: "index_projects_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
