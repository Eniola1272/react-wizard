import FormWrapper from "./FormWrapper";

export function AccountForm() {


    return (
        <FormWrapper title="Account Creation">
            <label>Email</label>
            <input type="email" autoFocus required />
            <label>Password</label>
            <input type="password" required />
            
        </FormWrapper>
    )
}