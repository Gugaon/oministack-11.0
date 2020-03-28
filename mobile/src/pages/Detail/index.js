import React from 'react';
import { Feather } from '@expo/vector-icons';

// Pacote para enviar e-mails
import * as MailComposer from 'expo-mail-composer';

// Usamos para navegar entre as páginas
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';

// buscando detalhes
// importando logo
import logoImg from '../../assets/logo.png';

import styles from './styles';

// exportando componente
export default function Detail() {

    const navigation = useNavigation();
    const message = 'Olá Zeroca!, Estou estou entrando em contato pois gostaria de ajudar no caso "Cadelinha atropelada" com o valor de R$ 120,00';

    function navigateBack() {
        navigation.goBack()
    }

    //Função para enviar email
    function sendMail() {
        MailComposer.composeAsync({
            subject: 'Herói do caso: Cadelinha atropelad',
            recipients: ['gustavo@zerobits.com.br'],
            body: message,

        })

    }

    // Função para enviar whatsapp
    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=5598987795386&text=${message}`);
    }

    return (

        <View style={styles.container} >
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>Ong:</Text>
                <Text styel={styles.incidentValue}>Zerobits</Text>

                <Text style={styles.incidentProperty}>Caso:</Text>
                <Text styel={styles.incidentValue}>Cadelinha Atropelada</Text>

                <Text style={styles.incidentProperty}>Value:</Text>
                <Text styel={styles.incidentValue}>R$ 120.00</Text>

            </View>
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>
                    Entre em contato:
                </Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>



        </View>

    );
}