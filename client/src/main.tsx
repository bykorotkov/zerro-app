import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"
import "@/app/css/global.scss"
import { Provider } from "react-redux"
import { setupStore } from "@/app/providers/store/store.ts"

const store = setupStore()

createRoot(document.getElementById(`root`)!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)
