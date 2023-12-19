package APIREST3;

public class posiciones {

	private String nombre;
	private String puntos;
	
	posiciones(){
		
	}
	
	posiciones(String nombre, String puntos){
		this.nombre = nombre;
		this.puntos = puntos;
	}
	
	public String getNombre() {
		return nombre;
	}
	
	public String getPuntos() {
		return puntos;
	}
	
	public void setNombre(String n) {
		nombre = n;
	}
	
	public void setPuntos(String n) {
		puntos = n;
	}
}
