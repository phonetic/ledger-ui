<template>
    <v-toolbar>
        <v-toolbar-title class="headline text-uppercase">
            <v-btn flat to="/">
                <span>Home</span>
            </v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn flat to="/ledgers">
            <span class="mr-2">Ledgers</span>
        </v-btn>
        <v-btn flat to="/keys">
            <span class="mr-2">API Keys</span>
        </v-btn>
    </v-toolbar>
</template>