let config = {};

if (Deno.args.length > 0) {
    config.database = Deno.env.toObject().DATABASE_URL;
  } else {
    config.database = {};
  }

export { config }; 
