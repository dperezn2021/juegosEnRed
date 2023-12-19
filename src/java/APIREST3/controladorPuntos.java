package APIREST3;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class controladorPuntos {
	
	List<posiciones> listPosi = recLista();
	
	@GetMapping("/api/getIp")
    public String getClientIp(HttpServletRequest request) {
        String clientIp = request.getRemoteAddr();
        return clientIp;
    }
	
	@PutMapping("/puntos/{nombre}")
	public ResponseEntity<posiciones> actuPuntos(@PathVariable String nombre, @RequestBody posiciones u){
		boolean comp = false;
		posiciones fin = new posiciones();
		
		for(int i = 0; i<listPosi.size();i++) {
			if(listPosi.get(i).getNombre().equals(u.getNombre())) {
					System.out.println("Entra");
					listPosi.get(i).setPuntos(u.getPuntos());
					comp = true;
					fin = listPosi.get(i);	
			}
		}
		if(comp){
			actuFichero();
			return new ResponseEntity<>(fin, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/puntos")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<posiciones> newUsuario(@RequestBody posiciones u) {
		posiciones aux1;
		posiciones aux2;
		boolean comp = false;
		for(int i = 0; i<listPosi.size();i++) {
			aux1 = listPosi.get(i);
				if(aux1.getNombre().equals(u.getNombre())) {
					aux2 = new posiciones(u.getNombre(),u.getPuntos());
					listPosi.set(i,aux2);
					Collections.sort(listPosi, new PersonComparator());
					comp = true;
			}
		}
		if(!comp){
			listPosi.add(u);
			Collections.sort(listPosi, new PersonComparator());
		}
		
		actuFichero();
		return new ResponseEntity<>(u, HttpStatus.OK);
	}
	
	@GetMapping("/puntos")
	public posiciones[] getLista() {
		posiciones aux[] = buscarLista();
		return aux;
	}
	
	@GetMapping("/puntos/{nombre}")
	public ResponseEntity<posiciones> getUsuario(@PathVariable String nombre) {
		boolean comp = false;
		posiciones fin = buscarUsuario(nombre);
		
		if(!fin.getNombre().equals(null) && !fin.getPuntos().equals(null)) {
			comp = true;
		}

		if(comp){
			return new ResponseEntity<>(fin, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public void actuFichero() {
        File file = new File("puntos.txt");

        try (BufferedWriter bw = new BufferedWriter(new FileWriter(file))) {
        	for(int i =0;i<listPosi.size();i++) {
        		bw.write(listPosi.get(i).getNombre());
             	bw.newLine();
             	bw.write(listPosi.get(i).getPuntos());
             	bw.newLine();
        	}
        } catch (IOException e) {
            e.printStackTrace();
        }
}

	
	public posiciones buscarUsuario(String nombre) {
		File file = new File("puntos.txt");
		posiciones aux = new posiciones();
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            for(int i = 0;i<listPosi.size()*2-1;i++) {
            	line = br.readLine();
            	if(line.equals(nombre)) {
            		String s1 = line;
            		String s2 = br.readLine();
            		aux.setNombre(s1);
            		aux.setPuntos(s2);
            	}
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return aux;
	}
	
	public posiciones[] buscarLista() {
		File file = new File("puntos.txt");
		posiciones listAux[] = new posiciones[listPosi.size()];
		int cont = 0;
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null && cont<listAux.length) {
            	posiciones aux = new posiciones();
            	String s1 = line;
        		String s2 = br.readLine();
        		aux.setNombre(s1);
        		aux.setPuntos(s2);
        		listAux[cont] = aux;
        		cont++;
            }
            
        } catch (IOException e) {
            e.printStackTrace();
        }
        for(int i = 0; i<listPosi.size();i++){
			System.out.println(listAux[i].getNombre()+", "+listAux[i].getPuntos());
	}
        return listAux;
	}
	
	public List<posiciones> recLista() {
		File file = new File("puntos.txt");
		List<posiciones> listAux = new CopyOnWriteArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null) {
            	posiciones aux = new posiciones();
            	String s1 = line;
        		String s2 = br.readLine();
        		aux.setNombre(s1);
        		aux.setPuntos(s2);
        		listAux.add(aux);
            }
            
        } catch (IOException e) {
            e.printStackTrace();
        }
        return listAux;
	}
}

class PersonComparator implements java.util.Comparator<posiciones> {
    @Override
    public int compare(posiciones a, posiciones b) {
        return  b.getPuntos().compareTo(a.getPuntos());
    }
}
