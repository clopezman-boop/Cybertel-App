/**
 * Servicio de autenticación con Firebase Authentication y Firestore
 */

import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  // REGISTRO DE USUARIO (ROL POR DEFECTO = CLIENTE)
  async registerUser(fullName: string, phone: string, email: string, username: string, password: string) {

    // Crear usuario en Firebase
    const credentials = await createUserWithEmailAndPassword(this.auth, email, password);

    // UID generado por Firebase
    const uid = credentials.user.uid;

    // Guardar datos adicionales en Firestore
    await setDoc(doc(this.firestore, 'users', uid), {
      fullName,
      phone,
      email,
      username,
      role: 'cliente'
    });

    return true;
  }

  // LOGIN DE USUARIO
  async loginUser(email: string, password: string): Promise<string | null> {

    const credentials = await signInWithEmailAndPassword(this.auth, email, password);
    const uid = credentials.user.uid;

    // Obtener rol del usuario
    return await this.getUserRole(uid);
  }

  // OBTENER UID DEL USUARIO AUTENTICADO
  async getCurrentUid(): Promise<string | null> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
        resolve(user ? user.uid : null);
      });
    });
  }

  // OBTENER ROL DESDE FIRESTORE
  async getUserRole(uid: string): Promise<string | null> {
    const userRef = doc(this.firestore, `users/${uid}`);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      const data = snap.data() as any;
      return data["role"] ?? null;
    }

    return null;
  }

  // CERRAR SESIÓN
  logout() {
    return signOut(this.auth);
  }
}

