<template>
<div class="login-container">
    <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label>Login:</label>
                <input type="text" v-model="credentials.login" required>
            </div>
            <div class="form-group">
                <label>Senha:</label>
                <input type="password" v-model="credentials.senha" required>
            </div>
            <button type="submit" :disabled="loading">
                {{ loading ? 'Entrando...' : 'Entrar' }}
            </button>

            <div v-if="error" class="error">
                {{ error }}
            </div>
        </form>
    </div>
</div>
</template>
<script>
import {ref} from 'vue'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';
export default{
    name: 'Login',
    setup(){
        const store = useStore()
        const router = useRouter()

        const credentials = ref({
            login: '',
            senha: ''
        })

        const loading = ref(false)
        const error = ref('')

        const handleLogin = async ()=>{
            loading.value = true
            error.value = ''

            const result = await store.dispatch('auth/login', credentials.value)

            if(result.success){
                router.push('/produtos')
            } else{
                error.value = result.message
            }

            loading.value = false
        }

        return{
            credentials, 
            loading,
            error,
            handleLogin
        }
    }
}
</script>
<style scoped>
.login-container{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
}
.login-form{
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}
.form-group{
    margin-bottom: 1rem;
}
label{
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}
input{
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}
button{
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color:white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
button:disabled{
    background-color: #ccc;
}
.error{
    color: red;
    margin-top: 1rem;
    text-align: center;
    
}
</style>