import { useEffect, useState } from 'react';
import { View, Image, FlatList } from 'react-native';

import logoImg from "../../assets/logo-nlw-esports.png";

import { SafeAreaView } from 'react-native-safe-area-context';

import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Header';

import { styles } from './styles';
import { Background } from '../../components/Background';
import {useNavigation} from '@react-navigation/native';

export function Home() {

  const[games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({id, title, bannerUrl}: GameCardProps) {
    navigation.navigate('game', {id, title, bannerUrl});

  }

  useEffect(() => {
    fetch('http://10.0.7.61:3333/games')
      .then(response => response.json())
      .then(data => setGames(data));
  }, []);

  return (
    <Background>
    <SafeAreaView style={styles.container}>
      <Image
        source={logoImg}
        style={styles.logo}
        />

        <Heading
        title="Encontre seu duo!"
        subtitle='Selecione o game que deseja jogar ...'
        />

        <FlatList
        data={games}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <GameCard 
          data={item}
          onPress={() => handleOpenGame(item)}/>
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
        

      

    </SafeAreaView>
    </Background>
  );
}