<template>
  <div class="produtos-container">
    <div class="header">
      <h1>Gerenciar Produtos</h1>
      <button @click="showForm = true" class="btn-primary">Novo Produto</button>
      <button @click="logout" class="btn-secondary">Sair</button>
    </div>
    <div v-if="showForm" class="modal">
      <div class="modal-content">
        <h3>{{ editingProduct ? 'Editar' : 'Novo' }} Produto</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Nome: </label>
            <input type="text" v-model="form.nome" required />
          </div>
          <div class="form-group">
            <label>Preço: R$</label>
            <input type="number" v-model="form.preco" step="0.01" required />
          </div>
          <div class="form-actions">
            <button type="submit">Salvar</button>
            <button type="button" @click="cancelForm">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
    <div class="produtos-list">
      <div v-if="loading" class="loading">Carregando...</div>
      <div v-else-if="produtos.length === 0" class="empty">Nenhum produto encontrado</div>
      <div v-else class="produtos-grid">
        <div v-for="produto in produtos" :key="produto.id" class="produtos-card">
          <h3>{{ produto.nome }}</h3>
          <p class="preco">R$ {{ produto.preco }}</p>
          <div class="card-actions">
            <button @click="editProduct(produto)" class="btn-edit">Editar</button>
            <button @click="deleteProduct(produto.id)" class="btn-delete">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'Produtos',
  setup() {
    const store = useStore()
    const router = useRouter()

    const showForm = ref(false)
    const editingProduct = ref(null)
    const form = ref({
      nome: '',
      preco: ''
    })

    const produtos = computed(() => {
      console.log('Produtos: ', store.getters['produtos/produtos'])
      return store.getters['produtos/produtos']
    })
    const loading = computed(() => store.getters['produtos/loading'])

    const handleSubmit = async () => {
      const action = editingProduct.value ? 'produtos/updateProduto' : 'produtos/createProduto'
      const data = editingProduct.value
        ? { ...form.value, id: editingProduct.value.id }
        : form.value

      const result = await store.dispatch(action, data)

      if (result.success) {
        cancelForm()
      }
    }

    const editProduct = (produto) => {
      editingProduct.value = produto
      form.value = { ...produto }
      showForm.value = true
    }

    const deleteProduct = async (id) => {
      if (confirm('Tem certeza que deseja excluir?')) {
        await store.dispatch('produtos/deleteProduto', id)
    
      }
    }

    const cancelForm = () => {
      showForm.value = false
      editingProduct.value = null
      form.value = { nome: '', preco: '' }
    }

    const logout = () => {
      store.dispatch('auth/logout')
      router.push('/login')
    }

    onMounted(() => {
      store.dispatch('produtos/fetchProdutos')
    })

    return {
      showForm,
      editingProduct,
      form,
      produtos,
      loading,
      handleSubmit,
      editProduct,
      deleteProduct,
      cancelForm,
      logout
    }
  },
}
</script>

<style scoped>
.produtos-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

.produtos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.produto-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background: white;
}

.preco {
  font-size: 1.2rem;
  font-weight: bold;
  color: #28a745;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn-edit {
  background-color: #ffc107;
  color: black;
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
