<script setup lang="ts">
const authStore = useAuthStore()
await authStore.logoutUser('LOGOUT_SUCCESS')
</script>

<route lang="yaml">
name: logout
</route>
