import Records from "./components/Records"
import { SnackbarProvider } from "notistack"

function App() {
    return(
        <SnackbarProvider>
        <Records/>
        </SnackbarProvider>
    )
}
export default App