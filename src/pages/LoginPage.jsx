import { Button, TextField } from "@mui/material"

export default function LoginPage() {
  return (
    <main>
      <h2>Log In</h2>
      <form action="">
        <TextField
          id="standard-basic"
          label="E-mail address"
          variant="standard"
          required
        />
        <p></p>
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          required
        />
        <p></p>
        <Button
          color="secondary"
          style={{ backgroundColor: "#003319", color: "#e0efdf" }}
        >
          Log-in
        </Button>
      </form>

      <h3>Or</h3>
      <h2>Sign Up</h2>
      <form action="">
        <TextField
          id="standard-basic"
          label="E-mail address"
          variant="standard"
          required
        />
        <p></p>
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          required
        />
        <p></p>
        <Button
          color="secondary"
          style={{ backgroundColor: "#003319", color: "#e0efdf" }}
        >
          Sign-up
        </Button>
      </form>
    </main>
  )
}
