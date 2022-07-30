<script lang="ts">
  import { createTRPCMutation, createTRPCQuery } from "$lib/utils/trpc";
  import { createForm } from "felte";
  import { validator } from "@felte/validator-zod";
  import { postValidator, type PostValidator } from "$lib/utils/validators";

  const hello = createTRPCQuery("hello", { greeting: "world" });
  const posts = createTRPCQuery("posts");
  const { mutate } = createTRPCMutation("createPost");

  const { form, errors } = createForm<PostValidator>({
    extend: validator({ schema: postValidator }),
    onSubmit: data => {
      mutate(data);
      posts.refetch();
    }
  });
</script>

<svelte:head>
  <title>SK TRPC</title>
</svelte:head>

<h1>Welcome to TRPC SK</h1>

{#await $hello}
  <p>Loading...</p>
{:then data}
  <p>{data}</p>
{/await}

<form use:form>
  <input type="text" name="title" autocomplete="off" />
  {#if $errors.title}
    <p style:color="red">{$errors.title}</p>
  {/if}
  <button type="submit">Submit</button>
</form>

{#await $posts}
  <p>Loading...</p>
{:then data}
  {#each data as post}
    <p>{post.id} - {post.createdAt.toLocaleDateString()} - {post.title}</p>
  {/each}
{/await}
