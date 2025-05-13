import { Slot } from 'expo-router';
import { AnswersProvider } from '../context/AnswersContext';

export default function Layout() {
    return (
        <AnswersProvider>
            <Slot />
        </AnswersProvider>
    );
}
