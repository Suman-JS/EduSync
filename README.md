# This is the guide to run this project as well as creating similar project of your own

## How to run this project?

### Using Docker

**Step 1 :**

Run the following command after pulling the docker image

```bash
docker run --env-file ./.env -p 3000:3000 ghcr.io/suman-js/edusync:latest
```

you need the `.env` file to run it. Here is the `.env` format

```javascript
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publisher_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

NEXT_STRIPE_PUBLISHABLE_KEY=your_stripe_publisher_key

NEXT_STRIPE_SECRET_KEY=your_stripe_secret_key


DATABASE_URL=your_mysql_db_url

UPLOADTHING_SECRET=your_uploadthing_secret

UPLOADTHING_APP_ID=uploadthing_appid
```

### Without docker

**Step 1 :**

Run the following command after cloning to your local machine.

You will need the `.env` file to run it. Here is the `.env` format

```javascript
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publisher_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

NEXT_STRIPE_PUBLISHABLE_KEY=your_stripe_publisher_key

NEXT_STRIPE_SECRET_KEY=your_stripe_secret_key


DATABASE_URL=your_mysql_db_url

UPLOADTHING_SECRET=your_uploadthing_secret

UPLOADTHING_APP_ID=uploadthing_appid
```

For dev mode:

```bash
pnpm dev
```

For production mode:

```bash
pnpm run build && pnpm run start

```

## How to create a nextjs app and containerize it and pushing to github or docker hub?

Let's start with createing a next.js app.

**Step 1:**

```bash
pnpm create next-app
```

it will ask you bunch of questions related to your project

**Step 2:**

Now develop your project as per your requirements. I have used prisma in this project.

**Step 3 :**
You need a `Dockerfile` in your root of your project

```dockerfile
FROM node:18-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# you need to capy prisma folder
COPY ./prisma prisma

RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \

# I'm using pnpm so adding prisma in this section, if you are using something else the make the changes to there
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile && pnpm dlx prisma generate --schema=/app/prisma/schema.prisma; \
    else echo "Lockfile not found." && exit 1; \
    fi

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN \
    if [ -f yarn.lock ]; then yarn run build; \
    elif [ -f package-lock.json ]; then npm run build; \
# I'm using pnpm so adding prisma in this section, if you are using something else the make the changes to there
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build && pnpm dlx prisma generate --schema=/app/prisma/schema.prisma; \
    else echo "Lockfile not found." && exit 1; \
    fi

FROM base AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs

RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next

RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node server.js

```

**Step 4 :**

Now you need create a docker image. The the following commands

You need to name the image like this, if you want to push it to github.

```bash
docker build . -t ghcr.io/suman-js/edusync:latest
```

**Step 5 :**
Now you need to run the image. Use the following command to run this image.

```bash
docker run --env-file ./.env -p 3000:3000 ghcr.io/suman-js/edusync:latest
```

We are mapping the 3000 port of the docker with the local 3000 port. and we need the `.env` file.

**Step 6 :**

Now let's push this image to github. First you need the genarate a personal access token (classic) from your github account. Follow this step to generate the token.

Goto you github account -> Sttings -> Developer Settings -> Personal Access Token (Classic).

Now generate a new token and save it somewhere securely. Make sure you have the permission for the following -

`write:packages,
delete:packages`

You will need this token for authentication.

**Step 7 :**

Now run the following command to login into github

```bash
docker login ghcr.io
```

It will ask you some questions. If it asks for the Username, just enter your github usename. Use you access token that you just generated as you password.

**Step 8 :**

Now we are ready to push it to the github. Run the following command to push the image to the github.

```bash
docker push ghcr.io/sumanjs/edusync:latest
```

It should sucessfully push the image to github.

#### How to push the image to Docker Hub?

**Step 1 :**

Login to you dockerhub account, if you don't have one create one and login into it.

Now create a new repo.

**Step 2 :**

Now open the terminal and tag you docker image. To tag your image run the following command.

```bash
docker tag <your_docker_image_id> <your_docker_hub_username>/<your_docker_hub_repo_name>:<tag e.g. latest or v1>
```

**Step 3 :**
If you didn't get any error, that means it worked :sweat_smile:. Jokes apart, Now let's push it to the docker hub. Run the following command the push it.

```bash
docker push sumanrocky/edusync:latest
```

It should push the image to docker hub.

If you want to run it on any vps or hosting platform, just pull the image from github or docker hub using following command.

```bash
docker pull sumanrocky/edusync:latest
```

Now just follow the previous instructions to run the docker image.

If you find this helpful, Please give me a star on any of my repo or give me a follow on any of my socials.

Happy hacking :wink:.

[Github](https://github.com/Suman-JS)
[LinkedIn](https://www.linkedin.com/in/suman7mondal/)
[My Portfolio](https://codejourneysuman.vercel.app/)
