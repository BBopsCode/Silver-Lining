import {useState} from "react";
import {FIREBASE_AUTH} from "../FirebaseConfig";

export default function LoginModal(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    return (
        <View>
            <Text style={styles.header}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button
                title="Login"
                onPress={async () => {
                    setLoading(true);
                    try {
                        await auth.signInWithEmailAndPassword(email, password);
                    } catch (error) {
                        alert(error.message);
                    }
                    setLoading(false);
                }}
                disabled={loading}
            />
        </View>
    );
}