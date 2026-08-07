import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
        // Focus automatique sur l'input du mot de passe quand la section s'ouvre
        setTimeout(() => passwordInput.current?.focus(), 100);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => cancelDeletion(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const cancelDeletion = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Supprimer le compte
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Une fois votre compte supprimé, toutes ses ressources et données seront définitivement effacées.
                </p>
            </header>

            {!confirmingUserDeletion ? (
                <DangerButton onClick={confirmUserDeletion}>
                    Supprimer le compte
                </DangerButton>
            ) : (
                /* Zone de confirmation affichée directement sous le bouton */
                <form 
                    onSubmit={deleteUser} 
                    className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 transition-all"
                >
                    <h3 className="text-base font-medium text-red-900">
                        Êtes-vous sûr de vouloir supprimer votre compte ?
                    </h3>

                    <p className="mt-1 text-sm text-red-700">
                        Veuillez saisir votre mot de passe pour confirmer la suppression définitive de votre compte.
                    </p>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="password"
                            value="Mot de passe"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-full sm:w-3/4"
                            placeholder="Mot de passe"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4 flex items-center space-x-3">
                        <DangerButton disabled={processing}>
                            Confirmer la suppression
                        </DangerButton>

                        <SecondaryButton type="button" onClick={cancelDeletion}>
                            Annuler
                        </SecondaryButton>
                    </div>
                </form>
            )}
        </section>
    );
}