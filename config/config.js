let config = {};

if (Deno.args.length > 0) {
    config.database = Deno.env.toObject().DATABASE_URL;
  } else {
    config.database = {
        hostname: "hattie.db.elephantsql.com",
        database: "jhutrobf",
        user: "jhutrobf",
        password: "TNcOy1BPUwgMO_t63kx6B0RzhglBp7e8",
        port: 5432
    };
  }

export { config }; 