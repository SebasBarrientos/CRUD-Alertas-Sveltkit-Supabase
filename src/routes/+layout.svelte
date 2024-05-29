<script>
    export let data;
    import "../app.pcss";
    import { goto, invalidateAll } from "$app/navigation";

    let { supabase, session } = data
    $: ({ supabase, session } = data)

    supabase.auth.onAuthStateChange(async (event) => {
        if(event === "SIGNED_IN") {
            invalidateAll();
        }

        if(event === "SIGNED_OUT") {
            await goto("login");
            invalidateAll();
        }
    })
    
</script>

<!-- Navbar -->
<div class="bg-base-100 justify-between top-0 left-0 right-0">
    <div class="navbar max-w-3xl mx-auto justify-between">
        <!--left side of navbar-->
        <div>
            <a href="/" class="btn btn-ghost text-xl">Primaram</a>
            {#if session !== null}
            <a href="/viewAlerts" class="btn btn-ghost">Alertas</a>
            <a href="/form" class="btn btn-ghost">Crear Alerta</a>
            <a href="https://172.31.188.119:8443/#/" class="btn btn-ghost ml-2">Guacamole</a>
            {/if}
        </div>
        <!--right side of navbar-->
        <div>
            {#if session == null}
                <button on:click={() => goto("/login")}>Login</button>
            {:else}
                <span class="text-lg ml-2">{session.user.email}</span>
                <button class="ml-2" on:click={async () => { await supabase.auth.signOut()}}>Logout</button>
            {/if}
        </div>
    </div>
</div>

<slot></slot>