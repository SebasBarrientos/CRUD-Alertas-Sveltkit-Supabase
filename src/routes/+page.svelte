<script>

    export let data;
import "../app.pcss";



let {  session } = data
$: ({  session } = data)

</script>

<div class="hero min-h-screen bg-base-300">
    <div class="hero-content">
        <div class="max-w-md text-center">
            <h1 class="font-bold text-4xl">Welcome to Primaram</h1>
            {#if session == null}
                <p class="py-6">Login to create alerts!</p>
                <a href="/login" class="btn btn-primary">Login</a>
            {:else}
            <span class=" text-lg ml-2">{session.user.email}</span>
            {/if}
        </div>
    </div>
</div>